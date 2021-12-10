<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            bottom-slots
            v-model="newQweetContent"
            placeholder="What's happening?"
            maxlength="280"
            class="new-qweet"
            counter
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            :disable="!newQweetContent"
            class="q-mb-lg"
            rounded
            unelevated
            color="primary"
            label="Qweet"
            no-caps
            @click="addNewQweet"
          />
        </div>
      </div>
      <q-separator class="divider" size="10px" color="grey-2" />
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slower"
          leave-active-class="animated fadeOut slower"
        >
          <q-item v-for="qweet in qweets" :key="qweet.id" class="qweet q-py-md">
            <q-item-section avatar top>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong> Fernando Junior </strong>
                <span class="text-grey-7"> @fejunior5 </span>
                <br class="lt-md" />
                &bull; {{ relativeDate(qweet.date) }}
              </q-item-label>
              <q-item-label class="qweet-content text-body1">
                {{ qweet.content }}
              </q-item-label>
              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn
                  color="grey"
                  size="sm"
                  icon="far fa-comment"
                  flat
                  round
                />
                <q-btn
                  color="grey"
                  size="sm"
                  icon="fas fa-retweet"
                  flat
                  round
                />
                <q-btn
                  @click="toggleLiked(qweet)"
                  :color="qweet.liked ? 'pink' : 'grey'"
                  :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  @click="deleteQweet(qweet)"
                  color="grey"
                  size="sm"
                  icon="fas fa-trash"
                  flat
                  round
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { formatDistance, subDays } from "date-fns";
import {
  collection,
  query,
  doc,
  onSnapshot,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import db from "src/boot/firebase";

export default defineComponent({
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      qweets: [
        // {
        //   id: "ID01",
        //   content:
        //     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis corporis quas illo sit similique a nisi nesciunt enim aliquam quis. Sunt suscipit vel officia tenetur odit optio a, distinctio vitae?",
        //   date: 1639122196541,
        //   liked: false,
        // },
        // {
        //   id: "ID02",
        //   content:
        //     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis corporis quas illo sit similique a nisi nesciunt enim aliquam quis. Sunt suscipit vel officia tenetur odit optio a, distinctio vitae?",
        //   date: 1639122214302,
        //   liked: true,
        // },
      ],
    };
  },
  methods: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
    addNewQweet() {
      let qweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked: false,
      };
      // this.qweets.unshift(qweet);
      const docRef = addDoc(collection(db, "qweets"), qweet);
      console.log("Document written with ID: ", docRef.id);
      this.newQweetContent = "";
    },
    async deleteQweet(qweet) {
      console.log(qweet);
      // let dateToDelete = qweet.date;
      // let index = this.qweets.findIndex((qweet) => qweet.date === dateToDelete);

      await deleteDoc(doc(db, "qweets", qweet.id));

      // this.qweets.splice(index, 1);
    },
    toggleLiked(qweet) {
      // Set the "capital" field of the city 'DC'
      updateDoc(doc(db, "qweets", qweet.id), {
        liked: !qweet.liked,
      });
    },
  },
  mounted() {
    // const querySnapshot = getDocs(collection(db, "qweets"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });

    const q = query(collection(db, "qweets"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let qweetChange = change.doc.data();
        qweetChange.id = change.doc.id;
        if (change.type === "added") {
          console.log("New qweet: ", qweetChange);
          this.qweets.unshift(qweetChange);
        }
        if (change.type === "modified") {
          console.log("Modified qweet: ", qweetChange);
          let index = this.qweets.findIndex(
            (qweet) => qweet.id === qweetChange.id
          );

          Object.assign(this.qweets[index], qweetChange);
          this.qweets[index].liked = qweetChange.liked;
        }
        if (change.type === "removed") {
          console.log("Removed qweet: ", qweetChange);
          let index = this.qweets.findIndex(
            (qweet) => qweet.id === qweetChange.id
          );
          this.qweets.splice(index, 1);
        }
      });
    });
  },
});
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-heigth: 1.4 !important
.divide
  border-top: 1px solid
  border-bottom: 1px solid
  boder-color: $grey-4
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
.qweet:not(:first-child)
  border-top: 1px solid rgba(0,0,0,0.12)
</style>
