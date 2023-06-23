package org.example.SecurityApp.services;

import org.example.SecurityApp.models.Role;
import org.example.SecurityApp.repositories.RoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoleServiceImpl {
    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Transactional
    public void deleteRoleById(Integer id) {
        roleRepository.deleteById(id);
    }

    @Transactional
    public void addRole(Role role) {
        roleRepository.save(role);
    }
}
