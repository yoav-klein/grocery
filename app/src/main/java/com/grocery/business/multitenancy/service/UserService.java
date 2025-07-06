package com.grocery.business.multitenancy.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.grocery.business.multitenancy.repository.UserRepository;
import com.grocery.business.multitenancy.repository.InvitationRepository;
import com.grocery.business.multitenancy.model.Invitation;
import com.grocery.business.multitenancy.model.User;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository; // Assuming you have a UserRepository for database operations

    @Autowired
    private InvitationRepository invitationRepository;

    public void addUser(User user) {
        userRepository.addUser(user);
    }

    public Optional<User> getUserById(String userId) {
        return userRepository.getUserById(userId);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<Invitation> getAllInvitationsForUser(String userId) {
        return invitationRepository.getAllInvitationsForUser(userId);

    }

}