const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const port = process.env.PORT|| 9000
const app = express()

//register middleware
app.use(bodyParser.json() , cors())


// Adding Type Definitions
// Định nghĩa các cấu trúc dữ liệu khác nhau. GraphQL hỗ trợ 1 vài loại kiểu dữ liệu

const typeDefinition = `
type Query  {
  greeting: String,
  name: String,
  age : Int
}`

// Adding resolver
// Một resolver là đối tượng sẽ xử lý và trả về dữ liệu tương ứng với yêu cầu của người dùng.

const  resolverObject = {
    Query : {
        greeting: () => 'Hello GraphQL  From TutorialsPoint !!',
        name: () => 'Im Lion Heart',
        age: () => 100
    }
}

// bind schema and resolver
const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs:typeDefinition, resolvers:resolverObject})

const {graphqlExpress, graphiqlExpress} = require('apollo-server-express')

//create routes for graphql and graphiql
app.use('/graphql',graphqlExpress({schema}))

app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

app.listen(port, () =>  console.log(`server is up and running at ${port}`))