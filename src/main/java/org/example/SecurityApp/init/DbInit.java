package org.example.SecurityApp.init;


import org.example.SecurityApp.models.Role;
import org.example.SecurityApp.models.User;
import org.example.SecurityApp.services.RoleServiceImpl;
import org.example.SecurityApp.services.UserService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class DbInit {
    private final UserService userService;
    private final RoleServiceImpl roleService;

    public DbInit(UserService userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    @PostConstruct
    private void postConstruct() {
        Role roleAdmin = new Role(1,"ROLE_ADMIN");
        Role roleUser = new Role( 2,"ROLE_USER");
        roleService.addRole(roleAdmin);
        roleService.addRole(roleUser);

        User user = new User("user", 2000   , "user", Set.of(roleUser));
        User admin = new User("admin", 2000, "admin", Set.of(roleAdmin));
        userService.save(user);
        userService.save(admin);
    }
}
