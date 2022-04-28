import { gql } from "@apollo/client";

export const GET_USER = gql`
    query getUser($username: String, $password: String) {
        users(where: {username: {_eq: $username}, password: {_eq: $password}}) {
            id
            email
            noHandphone
            password
            username
        }
    }
`;