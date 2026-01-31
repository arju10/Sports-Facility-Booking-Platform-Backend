"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    modelQuery;
    query;
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    // Search functionality
    search(searchableFields) {
        const searchTerm = this.query.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
    // Filter functionality
    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        // Handle date filtering
        if (queryObj.date) {
            this.modelQuery = this.modelQuery.find({
                date: queryObj.date,
            });
            delete queryObj.date;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    // Sort functionality
    sort() {
        const sort = this.query.sort?.split(",").join(" ") || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    // Pagination functionality
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    // Field limiting functionality
    fields() {
        const fields = this.query.fields?.split(",").join(" ") || "-__v";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    // Count total documents
    async countTotal() {
        const totalQueries = this.modelQuery.getFilter();
        const total = await this.modelQuery.model.countDocuments(totalQueries);
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const totalPages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            totalPages,
        };
    }
}
exports.default = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map