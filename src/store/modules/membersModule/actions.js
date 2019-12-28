export default {
    fetchMembers({
        commit
    }) {
        return new Promise(async (resolve, reject) => {
            let data = await axios.get('/fake/members.json');
            commit('fetchMembers', data.data);
            resolve(data.data);
        });

    }
}