# REGISGEN: nodejs-server

## About the author:

This project has been developed by Fernando Domínguez Santamaría ([fernandomain.com](https://fernandomain.com)) as part of the final degree work for his Degree in Computer Engineering at the International University of La Rioja ([UNIR](https://wwww.unir.net)).

## About the component:

This component is the server part of the REGISGEN project app.

It runs a [Node.js](https://nodejs.org) [Express](https://expressjs.com) server inside a [Docker](https://www.docker.com/) container and connect the front-end client app with the [MySQL](https://www.mysql.com/) database server.

The component exposes a RESTFUL API with the following services routes:

### [/api/auth/:credentials](/api/auth/:credentials)

Returns the login data for the parameters received.

Method: *GET*

Parameters:

- :credentials: *User login data (including locale for the messages system).*

### [/api/department/:id](/api/department/:id)

Deletes the department identified by the parameters received.

Method: *DELETE*

Parameters:

- :id: *Department identifier. (including locale for the messages system)*

### [/api/department/:id](/api/department/:id)

Returns the department for the parameters received.

Method: *GET*

Parameters:

- :id: *Department identifier. (including locale for the messages system)*

### [/api/department](/api/department)

Creates a new department from the data received.

Method: *POST*

Received:

- :data: *Data of the department (including locale for the messages system).*

### [/api/department](/api/department)

Updates the data of the department from the data received.

Method: *PUT*

Received:

- :data: *Data of the department (including locale for the messages system).*

### [/api/department/:id](/api/department/:id)

Deletes the department identified by the parameters received.

Method: *DELETE*

Parameters:

- :id: *Department identifier. (including locale for the messages system)*

### [/api/department/:id](/api/department/:id)

Returns the department for the parameters received.

Method: *GET*

Parameters:

- :id: *Department identifier. (including locale for the messages system)*

### [/api/department](/api/department)

Creates a new department from the data received.

Method: *POST*

Received:

- :data: *Data of the department (including locale for the messages system).*

### [/api/department](/api/department)

Updates the data of the department from the data received.

Method: *PUT*

Received:

- :data: *Data of the department (including locale for the messages system).*

### [/api/file/:id](/api/file/:id)

Deletes the file identified by the parameters received.

Method: *DELETE*

Parameters:

- :id: *File identifier. (including locale for the messages system)*

### [/api/file/:id](/api/file/:id)

Returns the file for the parameters received.

Method: *GET*

Parameters:

- :id: *File identifier. (including locale for the messages system)*

### [/api/file](/api/file)

Creates a new file from the data received.

Method: *POST*

Received:

- :data: *Data of the file (including locale for the messages system).*

### [/api/file-download/:file](/api/file-download/:file)

Downloads the file stream from the data received.

Method: *GET*

Received:

- :file: *Identification data of the file. (incluiding locale for the messages system)*

### [/api/file-upload](/api/file-upload)

Uploads the file from the stream received.

Method: *POST*

Parameters:

- :stream: *Stream with the data ot the file. (incluiding locale for the messages system)*

### [/api/departments/](/api/departments/)

Returns the departments list.

Method: *GET*

### [/api/menu/:id](/api/menu/:id)

Deletes the menu identified by the parameters received.

Method: *DELETE*

Parameters:

- :id: *Menu identifier. (including locale for the messages system)*

### [/api/menu/:id](/api/menu/:id)

Returns the menu for the parameters received.

Method: *GET*

Parameters:

- :id: *Menu identifier. (including locale for the messages system)*

### [/api/menu](/api/menu)

Creates a new menu from the data received.

Method: *POST*

Received:

- :data: *Data of the menu (including locale for the messages system).*

### [/api/menu](/api/menu)

Updates the data of the menu from the data received.

Method: *PUT*

Received:

- :data: *Data of the menu (including locale for the messages system).*

### [/api/menus/](/api/menus/)

Returns the menu list.

Method: *GET*

### [/api/menus/others/:id](/api/menus/others/:id)

Returns the menu list of others menus not equal to the one indicated on the parameters received.

Method: *GET*

Parameters:

- :id: *Menu identifier. (including locale for the messages system)*

### [/api/menu-crude/:menu/:role](/api/menu-crude/:menu/:role)

Returns the menu tree for the parameters received.

Method: *GET*

Parameters:

- :locale: *Locale for the messages system.*
- :menu: *Menu identifier.*
- :role: *Permission identifier.*

### [/api/permission/:id](/api/permission/:id)

Deletes the permission identified by the parameters received.

Method: *DELETE*

Parameters:

- :id: *Permission identifier. (including locale for the messages system)*

### [/api/permission/:id](/api/permission/:id)

Returns the permission for the parameters received.

Method: *GET*

Parameters:

- :id: *Permission identifier. (including locale for the messages system)*

### [/api/permission](/api/permission)

Creates a new permission from the data received.

Method: *POST*

Received:

- :data: *Data of the permission (including locale for the messages system).*

### [/api/permission](/api/permission)

Updates the data of the permission from the data received.

Method: *PUT*

Received:

- :data: *Data of the permission (including locale for the messages system).*

### [/api/permissions/](/api/permissions/)

Returns the permissions list.

Method: *GET*

### [/api/registry:id](/api/registry/:id)

Deletes the annotationn identified by the parameters received.

Method: *DELETE*

Parameters:

- :id: *Annotation identifier. (including locale for the messages system)*

### [/api/registry](/api/registry)

Returns the registry list.

Method: *GET*

### [/api/registry](/api/registry)

Creates a new annotation from the data received.

Method: *POST*

Received:

- data: *Data of the annotationr. (including locale for the messages system)*

### [/api/registry](/api/registry)

Updates the data of the annotation from the data received.

Method: *PUT*

Received:

- :data: *Data of the annotationr (including locale for the messages system).*

### [/api/registry/:id](/api/registry/:id)

Returns the registry's annotation for the parameters received.

Method: *GET*

Parameters:

- :id: *Annotation identifier. (including locale for the messages system)*

### [/api/registry/scroll/:after/:cont](/api/registry/scroll/:after/:count)

Returns the next registry's annotations from the parameters received.

Method: *GET*

Parameters:

- :after: *Identifier of the last annotation from where the registry list will be returned.*
- :count: *Number of annotations to be returned.*
- :locale: *Locale value for the messages system.*

### [/api/registry/search](/api/registry/search)

Returns the registry's annotations searched.

Method: *GET*

Parameters:

- :search: *Search values. (including locale for the messages system)*

### [/api/registry-files](/api/registry-files)

Updates the files for the registry from the data received.

Method: *PUT*

Parameters:

- :data: *Data of the registry's files. (including locale for the messages system)*

### [/api/registry-files/:id](/api/registry-files/:id)

Returns the files for the registry from the data received.

Method: *GET*

Parameters:

- :id: *Identifier of the registry. (including locale for the messages system)*

### [/api/thirdparty/:id](/api/thirdparty/:id)

Deletes the thirdparty identified by the parameters received.

Method: *DELETE*

Parameters:

- :id: *Thirdparty identifier. (including locale for the messages system)*

### [/api/thirdparty/:id](/api/thirdparty/:id)

Returns the thirdparty for the parameters received.

Method: *GET*

Parameters:

- :id: *Thirdparty identifier. (including locale for the messages system)*

### [/api/thirdparty](/api/thirdparty)

Creates a new thirdparty from the data received.

Method: *POST*

Received:

- :data: *Data of the thirdparty (including locale for the messages system).*

### [/api/thirdparty](/api/thirdparty)

Updates the data of the thirdparty from the data received.

Method: *PUT*

Received:

- :data: *Data of the thirdparty (including locale for the messages system).*

### [/api/thirdparties/](/api/thirdparties/)

Returns the thirdparties list.

Method: *GET*

### [/api/tree/:role](/api/tree/:role)

Returns the menus tree for the parameters received.

Method: *GET*

Parameters:

- :role: *Role identifier. (including locale for the messages system)*

### [/api/user](/api/user)

Creates a new user from the data received.

Method: *POST*

Received:

- data: *Data of the user. (including locale for the messages system)*

### [/api/user](/api/user)

Updates the data of the user from the data received.

Method: *PUT*

Received:

- :data: *Data of the user (including locale for the messages system).*

### [/api/user/:id](/api/user/:id)

Deletes the user identified by the parameters received.

Method: *DELETE*

Parameters:

- :id: *User identifier. (including locale for the messages system)*

### [/api/user/:id](/api/user/:id)

Returns the user data for the parameters received.

Method: *GET*

Parameters:

- :id: *Identifier of the user. (including locale for the messages system)*

### [/api/user/:id/:role](/api/user/:id/:role)

Returns the user data for the parameters received.

Method: *GET*

Parameters:

- :role: *Role of the user. (including locale for the messages system)*

### [/api/users/](/api/users/)

Returns the users list.

Method: *GET*

### [/api/user-permissions](/api/user-permissions)

Updates the permissions for the user from the data received.

Method: *PUT*

Received:

- :data: *Data of the user's permissions (including locale for the messages system).*

### [/api/user-permissions/:id](/api/user-permissions/:id)

Returns the user permissions for the parameters received.

Method: *GET*

Parameters:

- :id: *Identifier of the user (including locale for the messages system).*

### [/api/user-roles/:id](/api/user-roles/:id)

Returns the user roles for the parameters received.

Method: *GET*

Parameters:

- :id: *Identifier of the user (including locale for the messages system).*

## License:

You can find the license for this project at the LICENSE file.
