#include <stdio.h>
#include <emscripten.h>

int main() {
  printf("hello, world!\n");
  return 0;
}

extern "C" {
  EMSCRIPTEN_KEEPALIVE
  int sayHello(int a, int b) {
    return a + b;
    // printf("Yeah, biaaaaatch");
  }
}
