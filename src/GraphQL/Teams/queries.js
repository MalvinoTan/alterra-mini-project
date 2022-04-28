import { gql } from "@apollo/client";

export const GET_TEAMS = gql`
    query getTeams($id: Int) {
        teams(where: {id_user: {_eq: $id}}) {
            id
            id_user
            teamName
            university
        }
    }
`;

export const INSERT_TEAM = gql`
    mutation insertTeam($id_user: Int, $teamName: String, $university: String) {
        insert_teams_one(object: {id_user: $id_user, teamName: $teamName, university: $university}) {
            id
            id_user
            teamName
            university
        }
    }  
`

export const DELETE_TEAM_BY_ID = gql`
    mutation deleteTeam($id: Int!) {
        delete_teams_by_pk(id: $id) {
            id
        }
    }
`