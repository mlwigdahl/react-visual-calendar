// helper functions

export function drainGenerator(gen) {
    let val;
    do {
        val = gen.next();
    } while (!val.done)
    return val.value;
}