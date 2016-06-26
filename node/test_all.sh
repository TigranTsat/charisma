#!/bin/bash -e
node hpe_http_gate_test.js
res_1=$?
echo "Test 1 status: ${res_1}"
node analyze_test.js
res_2=$?
echo "Test 2 status: ${res_2}"

