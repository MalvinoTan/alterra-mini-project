import { gql } from "@apollo/client";

export const GET_TEAM_AND_MEMBERS_BY_ID = gql`
    query getTeamAndMembers($id: Int) {
        teams(where: {id: {_eq: $id}}) {
            id
            teamName
            university
        }
        members(where: {id_team: {_eq: $id}}) {
            email
            id
            id_team
            name
            nim
            noHandphone
        }
    }  
`;