#!/bin/bash

if [[ $1 = '--help' ]]; then
    cat <<EOF
Usage: $command_name [CMD]

Builds documentation and pushes it to the docs server.

EOF
    exit 0
fi


mkdir -p "${module_directory}/tmp/docs"

docker run \
       --rm \
       --volume="${project_directory}/bin":"/${project_id}/bin" \
       --volume="${project_directory}/share":"/${project_id}/share" \
       --volume="${project_directory}/include":"/${project_id}/include:ro" \
       --volume="${project_directory}/lib":"/${project_id}/lib" \
       --volume="${project_directory}/src":"/${project_id}/src:ro" \
       --volume="${project_directory}/test":"/${project_id}/test:ro" \
       --volume="${project_directory}/tools":"/${project_id}/tools:ro" \
       --volume="${project_directory}/CMakeLists.txt":"/${project_id}/CMakeLists.txt:ro" \
       --volume="${project_directory}/configure":"/${project_id}/configure:ro" \
       --volume="${project_directory}/LICENSE":"/${project_id}/LICENSE:ro" \
       --volume="${project_directory}/Makefile":"/${project_id}/Makefile:ro" \
       --volume="${project_directory}/README.md":"/${project_id}/README.md:ro" \
       --volume="${project_directory}/.git":"/${project_id}/.git:ro" \
       --volume="${module_directory}/tmp/docs":"/${project_id}/docs" \
       --workdir="/${project_id}/build" \
       $image_name \
       /bin/bash -c "cmake -D BUILD_DOCUMENTATION=ON .. && make docs && chown -R ${uid}:${uid} /${project_id}/docs"

ssh -p $docs_port $docs_user@$docs_host -C "mkdir -p $docs_dest_dir"

# Upload docs to docs server
rsync -av --delete -e "ssh -p ${docs_port} " "${module_directory}"/tmp/docs/html/ $docs_user@$docs_host:$docs_dest_dir

echo "The generated documentation is now available at"
echo "    ${G}"$docs_dest_dir${N} | sed "s%/home/share/Documentation/%${docs_url}/%"
