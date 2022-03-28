class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            // using a $ before a mongoDB operator is a must
            // regex = regular expression. It is a mongoDB operator.
            $regex: this.queryStr.keyword,
            // options - mongoDB operator. i = case insensitive for whatever keyword we are searching for
            $options: 'i',
          },
        }
      : {}
    this.query = this.query.find({ ...keyword })
    return this
  }

  filter() {
    const queryCopy = { ...this.queryStr }

    //   Removing some fields for category(case sensitive)
    const removeFields = ['keyword', 'page', 'limit']
    removeFields.forEach((key) => delete queryCopy[key])

    // Filter For Price and Rating
    // We are converting object to string, putting a $ sign before the price and then to object.
    // ( Because monDB objects must have a $ sign )
    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1
    // eg. current page =2, No. of items per page = 10,
    // We need to skip 10 products and from the 11th product should be in page 2.
    // skip = 10*(2-1)
    // limit, skip are mongoDB methods
    const skip = resultsPerPage * (currentPage - 1)
    this.query = this.query.limit(resultsPerPage).skip(skip)
    return this
  }
}

export default ApiFeatures
