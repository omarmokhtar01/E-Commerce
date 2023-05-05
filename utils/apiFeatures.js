// eslint-disable-next-line no-unused-vars
class ApiFeatures {
    constructor(queryMongoose, queryString) {
        this.queryMongoose = queryMongoose;
        this.queryString = queryString
    }

    filter() {
        // Spread Operator
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const queryObj = { ...this.queryString };
        const noQyery = ['page', 'limit', 'sort', 'feilds'];
        // delete from query string this feilds from array [page,limit]
        noQyery.forEach((del) => delete queryObj[del]);

        // Filtring by range
        let regularQueryObj = JSON.stringify(queryObj);
        // Regular Expression
        // eslint-disable-next-line no-const-assign
        regularQueryObj = regularQueryObj.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.queryMongoose = this.queryMongoose.find(JSON.parse(regularQueryObj))

        // Return Object for this class because use in another method
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.queryMongoose = this.queryMongoose.sort(sortBy);
        } else {
            this.queryMongoose.sort('-createdAt');
        }
        return this;
    }
    feildsLimiting() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.queryMongoose = this.queryMongoose.select(fields);
        } else {
            // __v auto field add from mongoose & make exclude
            this.queryMongoose = this.queryMongoose.select('-__v');
        }
        return this;
    }
    search(modelName) {
        if (this.queryString.search) {
            let querySearch = {};
            if (modelName == 'Products') {
                querySearch.$or = [
                    { title: { $regex: this.queryString.search, $options: 'i' } },
                    { description: { $regex: this.queryString.search, $options: 'i' } }]
            } else {
                querySearch = [
                    { name: { $regex: this.queryString.search, $options: 'i' } }]
            }

            this.queryMongoose = this.queryMongoose.find(querySearch);
        }
        return this;
    }
    pagination(countDocument) {
        const page = this.queryString.page * 1 || 1; // page num 1
        const limit = this.queryString.limit * 1 || 5; // num of Product in page (5 is defult value)
        const skip = (page - 1) * limit // skip Product in next page
        const endIndexPage = page * limit; //pagenum 2 * 10 limit =20
        // Pagination Result
        let paginate = {};
        paginate.currentPage = page;
        paginate.limit = limit;
        paginate.numOfPages = Math.ceil(countDocument / limit); // 50 / 5 = 10

        // next page
        if (endIndexPage < countDocument) {
            paginate.next = page + 1;
        }

        // Prev Page
        if (skip > 0) {
            paginate.prev = page - 1;
        }
        this.queryMongoose = this.queryMongoose.skip(skip).limit(limit);
        // add property for object to access data
        this.paginationResult = paginate;
        return this;
    }
}

module.exports = ApiFeatures;