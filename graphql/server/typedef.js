import fs from "fs";
import { URL } from "url"
import { gql } from "@apollo/client"

const typeDefs = gql `
  type Query {
    posts(filter: String, orderBy: PostOrderByInput): [Post!]!
    post(id: ID!): Post
    user(email: String!): User
  }

  input PostOrderByInput {
    createdAt: Sort
    membercount: Sort
    duration: Sort
  }

  enum Sort {
    asc
    desc
  }

  type Mutation {
    signup(
      email: String!
      username: String!
      password: String!
      name: String!
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createPost(
      title: String!
      description: String!
      goal: String!
      membercount: Int!
      duration: Int!
      weeklyhrs: Int!
      skills: [String!]!
    ): Post!
    applyToPost(id: ID!): Post
    updatePost(
      id: ID!
      title: String
      description: String
      goal: String
      membercount: Int
      duration: Int
      weeklyhrs: Int
      skills: [String!]
    ): Post
    deletePost(id: ID!): Post
  }

  type Post {
    id: ID!
    title: String!
    validated: Boolean!
    description: String!
    goal: String!
    membercount: Int!
    duration: Int!
    weeklyhrs: Int!
    skills: [String!]!
    createdAt: String!
    postedBy: User!
    appliedBy: [User!]!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    email: String!
    imageURL: String
    posts: [Post!]!
    appliedTo: [Post!]!
    token: String!
  }

  type AuthPayload {
    token: String
    user: User
  }
`;
export { typeDefs };