package org.example.SecurityApp.dto;


import org.example.SecurityApp.models.Role;
import java.util.Collection;

public class UserDTO {

    private String username;
    private int yearOfBirth;
    private String password;
    private Collection<Role> roles;

    public UserDTO() {
    }

    public UserDTO(String username, int yearOfBirth, String password) {
        this.username = username;
        this.yearOfBirth = yearOfBirth;
        this.password = password;
    }

    public UserDTO(String username, int yearOfBirth, String password, Collection<Role> roles) {
        this.username = username;
        this.yearOfBirth = yearOfBirth;
        this.password = password;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getYearOfBirth() {
        return yearOfBirth;
    }

    public void setYearOfBirth(int yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }
}
