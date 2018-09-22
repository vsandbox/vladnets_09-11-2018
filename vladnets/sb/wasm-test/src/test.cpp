#include <stdio.h>
#include <iostream>
#include <sstream>
#include <string>
#include <emscripten.h>

#define C_TEXT( text ) ((char*)std::string( text ).c_str())

int main() {
  printf("hello, world!\n");
  return 0;
}

int test() {
  std::ostringstream convert;
  return 0;
}

extern "C" {
  // EMSCRIPTEN_KEEPALIVE
  // int sayHello(int a, int b) {
  //   return a + b;
  //   // printf("Yeah, biaaaaatch");
  // }

  EMSCRIPTEN_KEEPALIVE
  char* addNums(signed char *buffer, int length) {
    signed char* convertedString = (signed char*)buffer;
    return C_TEXT("Fuck yourself otherwise motherfucker");
  }
}

