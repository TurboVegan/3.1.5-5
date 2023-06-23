package org.example.SecurityApp.repositories;

import org.example.SecurityApp.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository <Role, Integer> {
}
