module.exports = async (params, model, populations = [], transformFn) => {
   let { select, sort, page, limit, keyword, search } = removeFields(params)

   const queryString = {}

   // OTHER QUERY PARAMS
   for (const param of Object.entries(params)) {
      const key = param[0]

      let values = []

      if (!(param[1] instanceof Array)) values = [param[1]]
      else values = [...param[1]]

      for (const value of values) {
         // INIT KEYS
         if (!queryString[key]) {
            queryString[key] = {}
         }
         // IN OPERATOR
         const inRegex = /in\[(.*?)\]/g
         const inExtract = /\[(.*?)\]/g
         if (value.match ? value.match(inRegex) : false) {
            const matches = value.match(inExtract)[0]
            queryString[key].$in = extractArray(matches)
            continue
         }
         // NOT OPERATOR
         // DATE START
         const startRegex = /start\[(.*?)\]/g
         const startExtract = /\[(.*?)\]/g
         if (value.match ? value.match(startRegex) : false) {
            const match = value.match(startExtract)[0]
            const date = extractDate(match)
            queryString[key].$gte = date
            continue
         }
         // DATE END
         const endRegex = /end\[(.*?)\]/g
         const endExtract = /\[(.*?)\]/g
         if (value.match ? value.match(endRegex) : false) {
            const match = value.match(endExtract)[0]
            const date = extractDate(match)
            queryString[key].$lte = date
            continue
         }
         // DEFAULT
         queryString[key] = value
      }
   }
   // SEARCH PARAMS
   if (search && keyword) {
      queryString.$or = []

      for (const field of search.split(',')) {
         const statement = {}
         statement[field] = { $regex: RegExp(`.*${keyword}.*`, 'ig') }
         queryString.$or.push(statement)
      }
   }

   // INSTANTIATE QUERY
   let query = model.find(queryString)

   // SELECT
   if (select) query.select(select.split(',').join(' '))

   // SORT
   if (sort) query.sort(sort)
   else query.sort('-createdAt')

   // POPULATION
   for (const field of populations) query.populate(field)

   //PAGINATION
   page = parseInt(page, 10) || 1
   limit = parseInt(limit, 10) || 20
   query.skip((page - 1) * limit).limit(limit)

   // COUNT DOCUMENTS
   const total = await model.countDocuments(queryString)

   // EXECUTE QUERY
   let results = await query.lean()

   // TRANSFORM FUNCTION
   if (transformFn) {
      results = await Promise.all(
         results.map(async (r) => await transformFn(r))
      )
   }

   return {
      success: true,
      total,
      count: results.length,
      data: results,
   }
}

// EXTRACT ARRAY
// converts "[V1,V2,V3]" to ['V1','V2','V3']
function extractArray(str) {
   return `${str}`.substr(1, str.length - 2).split(',')
}

// EXTRACT DATE
// converts "[dd/mm/yyyy]" to date object
function extractDate(str) {
   return new Date(str.substr(1, str.length - 2))
}

// REMOVE SPECIAL FIELDS
function removeFields(params = {}) {
   const specialFields = {}
   for (const param of Object.entries(params)) {
      const key = param[0]
      const value = `${param[1]}`
      if (
         key === 'select' ||
         key === 'sort' ||
         key === 'page' ||
         key === 'limit' ||
         key === 'keyword' ||
         key === 'search'
      ) {
         specialFields[key] = value
         delete params[key]
      }
   }
   return specialFields
}
