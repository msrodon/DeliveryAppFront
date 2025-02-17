<template>
    <white-card-80>
        <base-dialog :show="!!showDialog" title="Delete dictionary confirm" @close="showDialog = !showDialog">
        </base-dialog>

        <h2 class="fw-bold mb-2 text-uppercase">
            {{ dictionaryType }} dictionaries
        </h2>
        <hr />
        <div class="mt-4">
            <table class="table" v-if="items.length > 0">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Default</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dictionary in items" :key="dictionary.dictionaryId">
                        <th scope="row">{{ dictionary.dictionaryId }}</th>
                        <td>{{ dictionary.name }}</td>
                        <td>{{ dictionary.isDefault }}</td>
                        <td>
                            <button size="sm" @click="editDictionary(dictionary.dictionaryId)" class="me-3 btn btn-primary">
                                Edit
                            </button>
                            <button size="sm" @click="deleteDictionary(dictionary.dictionaryId)" class="btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else>
                <h1>NO DICTIONARIES FOUND</h1>
            </div>

            <!-- <template #table-busy>
              <div class="text-center text-primary my-5">
                <b-spinner class="align-middle"></b-spinner>
                <strong> Loading...</strong>
              </div>
            </template>
-->
        </div>
        <!-- <button class="btn btn-secondary" v-on:click="resetSort()">Reset sort</button> -->
        <button class="btn btn-outline-success px-5 mt-3" v-on:click="addNewDictionary()">
            Add new dictionary
        </button>
    </white-card-80>
</template>

<script>
export default {
    data() {
        return {
            dictionaryTypeId: 0,
            items: [],
        };
    },

    mounted() {
        this.dictionaryTypeId = this.$route.params.typeId;
        this.getDictionariesData();
    },
    methods: {
        resetSort() { },

        async getDictionariesData() {
            this.busyState = true;

            var url = "https://localhost:7263/Dictionaries/getDictionariesByType?";
            const token = localStorage.getItem("token");

            const response = await fetch(url +
                new URLSearchParams(
                    {
                        dictionaryTypeId: this.dictionaryTypeId,
                    }),
                    {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
            );

            const responseJson = await response.json();

            this.items = responseJson.dictionaries;
            this.busyState = false;
        },

        deleteDictionary() {
            // this.showDialog = true;
        },

        async deleteDictionary(dictionaryId) {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(
                    "https://localhost:7263/Dictionaries/removeDictionary",
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            dictionaryId: dictionaryId,
                            dictionaryTypeId: Number.parseInt(this.dictionaryTypeId, 10) || undefined
                        }),
                        credentials: "include",
                    }
                );
            } catch (error) { }
            window.location.href = window.location.href;
        },

        editDictionary(dictionaryId) {
            var route = "/DictionaryTypes/"+ this.dictionaryTypeId + "/Dictionaries/EditDictionary/" + dictionaryId;
            this.$router.push({ path: route });
        },

        addNewDictionary() {
            var route = "/DictionaryTypes/"+ this.dictionaryTypeId + "/Dictionaries/AddDictionary/";
            this.$router.push({ path: route });
        },
    },
};
</script>
