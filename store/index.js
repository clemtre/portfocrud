

export const state = () => ({
	ui: [
		{nom : 'trad', on : true},
		{nom : 'images', on : true, taille : '90vh'},
		{nom : 'bio', on : true},
		{nom : 'clients', on : true},
	]
	,
	projets: []
	,
	db: []

})

export const getters = {
	getName: (state) => (nom) => {
		return state.ui.find(thing => thing.nom === nom)
		
	},
	getProjectName: (state) => (id) => {
		return state.projets.find(thing => thing.id === id)
		
	},
}

export const mutations = {
	ADD_PROJET(state, page){
		state.projets = [{id: page.id, fr : page.fr, en : page.en, on : true }, ...state.projets]
	},
	SWITCH(state, data){
		data.on = !data.on
	},
	SORT_FETCH(state, data){
		for (const projet of data.Projets.data) {
				const nomClient = data.Clients.data.find((x) => x.id === projet.client);
				projet.nomClient = nomClient.nom;
				if (projet.medias.length) {
					for (let media = 0; media < projet.medias.length; media++) {
						const imageRes = data.Images.data.find((x) => x.id === projet.medias[media]);
						if (imageRes) {
							projet.medias[media] = imageRes.images.map(
								(x) => x.directus_files_id
							);
						}
					}
				}
		}
		state.db = data.Projets.data
	}

}
export const actions = {
	async nuxtServerInit(/*{ commit }*/) {
		//	console.log('hellowrold')
	}
}