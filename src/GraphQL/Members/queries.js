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

export const INSERT_MEMBER = gql`
    mutation insertMember($id_team: Int, $name: String, $nim: String, $email: String, $noHandphone: String) {
        insert_members_one(object: {id_team: $id_team, name: $name, nim: $nim, email: $email, noHandphone: $noHandphone}) {
            id
        }
    }
`;

export const DELETE_MEMBER = gql`
    mutation deleteMemberById($id: Int!) {
        delete_members_by_pk(id: $id) {
            id
        }
    }
`;