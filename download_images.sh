#!/bin/bash

# Download image with proper headers to bypass hotlink protection
download_image() {
    local url="$1"
    local output="$2"
    
    curl -s -L \
        -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" \
        -H "Referer: https://mojodasspa.com/" \
        -o "$output" \
        "$url"
    
    if [ $? -eq 0 ] && [ -s "$output" ]; then
        echo "✓ Downloaded: $output"
        return 0
    else
        echo "✗ Failed: $url"
        rm -f "$output"
        return 1
    fi
}

export -f download_image

# Download all images from a list
cat "$1" | parallel -j 4 'download_image {}'
