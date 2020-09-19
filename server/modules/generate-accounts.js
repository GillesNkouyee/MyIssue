// let _createUsers = ( users ) => {
//   for ( let i = 0; i < users.length; i++ ) {
//     let user       = users[ i ],
//         userExists = _checkIfUserExists( user.email );
//
//     if ( !userExists ) {
//       let userId  = _createUser( user ),
//           isAdmin = _checkIfAdmin( user.email );
//
//       if ( isAdmin ) {
//         Roles.setUserRoles( userId, 'admin' );
//       } else {
//         Roles.setUserRoles( userId, 'basic' );
//       }
//     }
//   }
// };
// Modules.server.generateAccounts = generateAccounts;
// var users = [
//       {name:"Normal User",email:"normal@example.com",roles:[]},
//       {name:"View-Secrets User",email:"view@example.com",roles:['basic']},
//       {name:"Manage-Users User",email:"manage@example.com",roles:['manager']},
//       {name:"Admin User",email:"admin@example.com",roles:['admin']}
//     ];
//
// _.each(users, function (user) {
//   var id;
//
//   id = Accounts.createUser({
//     email: user.email,
//     password: "apple1",
//     profile: { name: user.name }
//   });
//
//   if (user.roles.length > 0) {
//     // Need _id of existing user record so this call must come
//     // after `Accounts.createUser` or `Accounts.onCreate`
//     Roles.addUsersToRoles(id, user.roles, 'default-group');
//   }
//
// });
