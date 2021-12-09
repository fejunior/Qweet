<template>
  <q-page class="">
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
        />
      </div>
    </div>
    <q-separator class="divider" size="10px" color="grey-2" />

    <q-list>
      <q-item class="q-py-md">
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong> Fernando Junior </strong>
            <span class="text-grey-7"> @fejunior5 </span>
          </q-item-label>
          <q-item-label class="qweet-content text-body1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perspiciatis corporis quas illo sit similique a nisi nesciunt enim
            aliquam quis. Sunt suscipit vel officia tenetur odit optio a,
            distinctio vitae?
          </q-item-label>
          <div class="qweet-icons row justify-between q-mt-sm">
            <q-btn color="grey" size="sm" icon="far fa-comment" flat round />
            <q-btn color="grey" size="sm" icon="fas fa-retweet" flat round />
            <q-btn color="grey" size="sm" icon="far fa-heart" flat round />
            <q-btn color="grey" size="sm" icon="fas fa-trash" flat round />
          </div>
        </q-item-section>

        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
    };
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
</style>
