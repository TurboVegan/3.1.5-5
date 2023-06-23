package org.example.SecurityApp.services;

import org.example.SecurityApp.dto.UserDTO;
import org.example.SecurityApp.models.User;
import org.example.SecurityApp.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserService {


    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository, ModelMapper modelMapper) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }



    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findOne(int id) {
        Optional<User> foundPerson = userRepository.findById(id);

        return foundPerson.orElse(null);
    }

    public User findByUsername(String username) {
        Optional<User> foundPerson = userRepository.findByUsername(username);

        return foundPerson.orElse(null);
    }

    @Transactional
    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void update(int id, User updatedPerson) {
        updatedPerson.setId(id);
        updatedPerson.setPassword(passwordEncoder.encode(updatedPerson.getPassword()));
        userRepository.save(updatedPerson);
    }

    @Transactional
    public void delete(int id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public User convertToUser(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }

    @Transactional
    public UserDTO convertToUserDTO(User user) {
        return modelMapper.map(user, UserDTO.class);

    }
}
