var {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

var Db = require('./db');

var postModels = new GraphQLObjectType({
    name: 'tablePosts',
    description: 'list of all posts',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve (tablePosts) {
                    return tablePosts.id;
                }
            },
            post: {
                type: GraphQLString,
                resolve (tablePosts) {
                    return tablePosts.post;
                }
            }
            ,
            idUser: {
                type: GraphQLString,
                resolve (tablePosts) {
                    return tablePosts.idUser;
                }
            }
        };
    }
});

var Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
        return {
            posts: {
                type: new GraphQLList(postModels),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    post: {
                        type: GraphQLString
                    },
                    idUser: {
                        type: GraphQLInt
                    }
                },
                resolve (root, args) {
                    return Db.models.tablePosts.findAll({ where: args });
                }
            }
        };
    }
});

var Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Functions to set Post',
    fields () {
        return {
            addPost: {
                type: postModels,
                args: {
                    post: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    idUser: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve (source, args) {
                    return Db.models.tablePosts.create({
                        post: args.post,
                        idUser: args.idUser
                    });
                }
            },
            delPostById: {
                type: postModels,
                description: 'Delete an post with id and return the post that was deleted.',
                args: {
                    id: { type: new GraphQLNonNull(GraphQLInt) }
                },
                resolve: (source, args) => {
                    return Db.models.tablePosts.destroy({
                        where: {
                            id: args.id
                        }
                    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
                        if(rowDeleted === 1){
                            console.log('Deleted successfully');
                        }
                    }, function(err){
                        console.log(err);
                    });
                }
            },
            delPostByUserId: {
                type: postModels,
                description: 'Delete an post with idUser and return the post that was deleted.',
                args: {
                    idUser: { type: new GraphQLNonNull(GraphQLInt) }
                },
                resolve: (source, args) => {
                    return Db.models.tablePosts.destroy({
                        where: {
                            idUser: args.idUser
                        }
                    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
                        if(rowDeleted === 1){
                            console.log('Deleted successfully');
                        }
                    }, function(err){
                        console.log(err);
                    });
                }
            }
        };
    }
});

var Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,

});
module.exports = Schema;

