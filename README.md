# file-manager

The program is started by `npm run start -- --username=your_username`

## List of operations and their syntax:

### Navigation & working directory (nwd)
`up` Go upper from current directory 

`cd path_to_directory` Go to dedicated folder from current directory 

`ls` Print in console list of all files and folders in current directory. 
### Basic operations with files
`cat path_to_file` Read file and print it's content in console 

`add new_file_name` Create empty file in current working directory

`rn path_to_file new_filename` Rename file (content should remain unchanged)

`cp path_to_file path_to_new_directory` Copy file (should be done using Readable and Writable streams)

`mv path_to_file path_to_new_directory` Move file

`rm path_to_file` Delete file:

### Operating system info (prints following information in console)
`os --EOL` Get EOL (default system End-Of-Line) and print it to console

`os --cpus` Get host machine CPUs info 

`os --homedir` Get home directory and print it to console

`os --username` Get current system user name 

`os --architecture` Get CPU architecture for which Node.js binary has compiled and print it to console

### Hash calculation
`hash path_to_file` Calculate hash for file and print it into console

### Compress and decompress operations
`compress path_to_file path_to_destination` Compress file (using Brotli algorithm, should be done using Streams API)

`decompress path_to_file path_to_destination` Decompress file (using Brotli algorithm, should be done using Streams API)
