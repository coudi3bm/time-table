<template>
  <v-card
    :flat="flat"
    color="content"
    style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
    rounded="lg"
  >
    <v-card-title>
      <slot name="title" />
    </v-card-title>

    <v-card-text style="color: inherit" class="text-center">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="rounded-t-lg border">
            <v-card-text style="color: inherit" class="py-0">
              <v-row class="font-weight-medium" no-gutters>
                <v-col cols="2"> № </v-col>
                <v-col> Начало </v-col>
                <v-col> Конец </v-col>
              </v-row>
            </v-card-text>
          </div>
        </v-col>

        <v-col
          cols="12"
          v-for="(item, i) in callTimes"
          :key="i"
          style="padding-top: 2px; padding-bottom: 2px"
        >
          <div
            :class="
              i === callTimes.length - 1 ? 'rounded-b-lg border' : 'border'
            "
          >
            <v-card
              color="transparent"
              tile
              flat
              @click="click(item, i)"
              :class="i === callTimes.length - 1 ? 'rounded-b-lg ' : ''"
            >
              <v-card-text style="color: inherit" class="py-1">
                <v-row v-if="Array.isArray(item)" align="center" no-gutters>
                  <v-col cols="2" class="font-weight-medium">
                    {{ i + 1 }}
                  </v-col>
                  <v-col>
                    <v-row dense class="py-1">
                      <v-col> {{ item[0].start }} </v-col>
                      <v-col> {{ item[0].end }} </v-col>
                    </v-row>
                    <v-divider />
                    <v-row dense class="py-1">
                      <v-col> {{ item[1].start }} </v-col>
                      <v-col> {{ item[1].end }} </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row v-else no-gutters>
                  <v-col cols="2" class="font-weight-medium">
                    {{ i + 1 }}
                  </v-col>
                  <v-col> {{ item.start }} </v-col>
                  <v-col> {{ item.end }} </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
        </v-col>

        <v-col v-if="lunchTimes.start && lunchTimes.end" cols="12">
          <v-card-text style="color: inherit" class="py-1">
            <v-row no-gutters>
              <v-col cols="2" class="font-weight-medium"> Обед </v-col>
              <v-col> {{ lunchTimes.start }} </v-col>
              <v-col> {{ lunchTimes.end }} </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card-text>

    <slot name="actions" />
  </v-card>
</template>

<script>
export default {
  props: {
    lunchTimes: Object,
    callTimes: Array,
    flat: Boolean,
  },
  methods: {
    click(item, index) {
      this.$emit('click', {
        index: index,
        calls: item,
      })
    },
  },
}
</script>

<style scoped>
.border {
  border: 1px solid var(--v-headerBorder-base);
}
</style>