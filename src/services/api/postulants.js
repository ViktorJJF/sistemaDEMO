export default {
    getMembers(params) {
        return axios.get('/fake/members.json', {
            params
        });
    },
    editMember(id, payload) {
        return axios.put(`/members/${id}`, payload)
    },
    saveMember(payload) {
        return axios.post('/members/', payload)
    },
    deleteMember(id) {
        return axios.delete(`/members/${id}`)
    }
}