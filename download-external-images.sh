#!/bin/bash
set -e

# Download external Google images to local paths
cd /home/dominic/Documents/mojodasspa/mojodas-spa/public/images

# Hero background
wget -O marketing/hero-bg.jpg \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  --referer="https://mojodasspa.com/" \
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBcc-_pz3yDuVJhYgqDULzjZGKFWTGKC_prEXti2syqkOtJ9m_y3zizzY3pN421_dFpEUR0OMrrtSqRBiWRf4rctpEwQAnuPqjmqJUcbgnkxnK_GkQV-LTMg0_swDvQt4Lvv0v93XlLgqDLAw_1mGrBSWzF33F__HThVpym4GIPhXtr2RTS4gARL6wKh9oYeyHroKa60XofZMMREeS74HTbkNnINYBsyt7HNu6uX7ryKTFL8w24lq29aKgqb7uJHtToywmn922rQYY"

# B2B Hero / Modern cabin image (reused in B2BModels and B2BHero)
wget -O b2b/modern-cabin.jpg \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  --referer="https://mojodasspa.com/" \
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCQF0iRK4nuaXgoWoUcoeqbc0VhwTG4AXksk1m0L7Thh6otUpVrgsu4MINOL7PufWmw3qR7lo_0e1Q8D7fcLN6jOH3HHqdFr4LDtd6KAG8NZ11nxfi1yo8i08OBtdk86dqf3yuwNJCjrUj0VKgp82BVhCxKVvY58gL0eSpb3NMQ9-u8c-iErj0wu8Y5ilIuUu23pewjzF3MU6fzd8aLApTZtqP7yciLq2qFd5p3tCOr_4pxSBEx8UvYdgUJGCINnyzoIugf4deHPAA"

# B2B Model - Ofuro/small tub
wget -O b2b/ofuro-model.jpg \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  --referer="https://mojodasspa.com/" \
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDLCc95wXpJ75aZGgdFs7-vwoxe7RUHJj_1qxTUcRhI8zvh50gXSTicNSCeEakXuZr6M-L0CAEuOF56Ni331j6V5e_abs6QbLivsIgdM11i2bzey0UUIqL085Q5ys_zzmevwPiIUfAcqzlrmW5U3uoHugJqkPYwYBzM8GPWS8h3CAidDwYufn0XDN7cuU27BW0FcyrjSSQ7VvSZoau2zMURoggFxV5i3wkxZ2Qz93B8slLgXIgBPjqMWnvPoj4IFsswbEEJyHRwhik"

# B2B Model - Grande round
wget -O b2b/grande-model.jpg \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  --referer="https://mojodasspa.com/" \
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA6jvWC4VZKtz1BGxZ5gQ1yVxY1DdSl1F4GXvNwBK6o3CpcQYDO7AhE8iSeXYJ9SrUNmnNRTamaYMchE15wbQwzAZsGzQ0hf7dkGYu9TKVKq0forlJnmWsZwiL1pWZ_7Qf6JD_OQ0mdfJgjwFRXpM1m0dVkPmt_JGGvSYldwHsJ3hXY8uOAPRVLd4lR2ytTkiNC9h9U7bEFFl3yraid1VDtjeqCgsuxYJouhOefOwBeBwDv_6Yf8ldPeDnitcPkJkSEz75hUrkvfR4"

# Engineering/Filtration system
wget -O b2b/filtration-system.jpg \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  --referer="https://mojodasspa.com/" \
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDUAj_LXuFdy8VwpE1zvyJebQ6E4tbulaQ1k3MH7jGwvXkHsuaOJtdaYCZGrV9LKy_8BoO0I8HmaT3gefysrk8xiUkwAlaDWa6oGWqgqtGsBZbpwmUYfoGS61tn2ZOMbsfNsPYvDmeMKfUYkZuofLUbTqcAfqZZmA0_ZCYiarVKh-dVXHJygQmSz8zZCreMknbpDTPIpENyym9GmmQn-TeMFdkLMpCrxO0w8trv3kbyTpeSSY1z7Fyzxt-9Rp7Be1zMD9mYqnaEqws"

# Calendly background (reused in B2BCalendly and ContactCalendly)
wget -O b2b/calendly-bg.jpg \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  --referer="https://mojodasspa.com/" \
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDJCX8eoMkbZDS6IiTq8SmsQlABPsbKqzGuikyHa0OAlLF4trbbUmGrfye2SmD0zcO7OhjPhzmPXzT4ytM5GJZVxUr_GDYhHO4ynuK3nOlsUmE-ummouAnRdsQfi8acnOxm_D6ibNkUimuJUKIdUhDQgfThln4tbfFGLjZSjBdOdnqpga8EwY6n1OR4wkRmm_ScMFZbUlpesYe2mmsYqeZY9Hq9DwjY9DDXy8SxRnQi9_b354AurFx27DDm6RWOG1Kf-rt4EOsQcVw"

# OrderSummary product placeholder
wget -O products/order-placeholder.jpg \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  --referer="https://mojodasspa.com/" \
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBwI_H8qSzLCL22GaFc03VZ3hpvLFC6tBxyXgBRItaU5pc8PeSN82WOc7Mh7cAF4AXG2HOrbSzJoXNmROhYSYhWhk81vopdnwN4zTTXFelnVfoTqrhP7jQxy9f0jRMc1mOHfFOuIr-BfBOGiD0DOAP6Gx_tGVHXOCj_wYQF6g-TPZCmgQnD6BMKbV0VPGKx_-7Qny6iV-_ysrbJNES7PzEtlApobL1Pa-7lh5NiRzLSRllO2Qb-TNLrYefPk6gG4nsqFTUivAgKhPtZ"

echo "All images downloaded successfully"
ls -lh marketing/ b2b/ | grep -E "jpg|png"
