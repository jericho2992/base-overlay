<script>
    export let scorer;
    export let assist;
    export let speed;

</script>
<div class="main">
    <h1>Goal: <span>{scorer}</span></h1>
    <h2>Assist: <span>{assist}</span></h2>
    <h2>{speed} kph</h2>
</div>
<style>
    .main {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        width: 100vw;
        min-width: 100vw;
        max-width: 100vw;
        background-image: linear-gradient(white, transparent);
        color: black;
    }
    span {
        transform: skew(-25deg);
    }
</style>