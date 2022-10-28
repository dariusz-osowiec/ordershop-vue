<template>
  <!--
    Panel formularza kontaktowego.
  -->
  <div style="background-color: #ddfacf; height: 30%">
    <div class="text-center mb-5" style="margin-top: 2em; padding-top: 20px">
      <h5 class="display-3"><b>Masz pytanie?</b></h5>
      <h6 class="display-4">Zadaj je nam, a my odpiszemy jak najszybciej!</h6>
    </div>
    <form
      method="post"
      asp-page-handler="sendQuestion"
      class="justify-content-center"
      style="
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2em;
        padding-bottom: 20px;
      "
    >
      <input
        class="mb-3"
        type="email"
        placeholder="Wpisz adres email"
        style="width: 100%"
        v-model="mail"
      />
      <textarea
        class="mb-3"
        type="text"
        placeholder="Wpisz treść pytania..."
        style="width: 100%; min-height: 200px"
        v-model="content"
      ></textarea>
      <div style="width: 80%; margin-left: auto; margin-right: auto">
        <button
          type="button"
          class="button-style button-ok"
          style="width: 100%; height: 60px; font-size: 25px"
          @click="onSendClick"
        >
          Wyślij
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactFormComponent",
  data() {
    return {
      mail: "",
      content: "",
    };
  },
  props: {
    serverAddress: String,
  },
  methods: {
    //Wysłanie zapytania do API.
    async onSendClick(e) {
      try {
        if (this.validateQuestion()) {
          e.preventDefault();
          const question = {
            mail: this.mail,
            content: this.content,
          };
          const res = await fetch(this.serverAddress + "/questions/ask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(question),
          });
          if (res.status === 200) {
            this.mail = "";
            this.content = "";
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    //Walidacja zapytania.
    validateQuestion() {
      if (this.mail.trim().length === 0) {
        alert("Brak wpisanego adresu e-mail");
        return false;
      }
      if (this.content.trim().length === 0) {
        alert("Brak wpisanego treści wiadomości");
        return false;
      }
      return true;
    },
  },
};
</script>
