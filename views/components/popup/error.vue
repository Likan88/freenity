<template>
    <transition mode="out-in" name="slide-fade-bottom" appear>

        <div class="alert alert-danger my-0" v-if="text">
            {{ text }}
        </div>

    </transition>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            default: null
        }
    }
}
</script>

