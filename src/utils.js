export function mod(m, val) {
    while (val < 0) {
      val += m;
    }
    return val % m;
}