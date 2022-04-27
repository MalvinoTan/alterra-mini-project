import { gql } from "@apollo/client";

export const GET_USER = gql`
    query getUser($username: String) {
        users(where: {username: {_eq: $username}}) {
            id
            email
            noHandphone
            password
            username
        }
    }
`;