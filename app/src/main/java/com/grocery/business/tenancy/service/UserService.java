package com.grocery.business.tenancy.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.business.tenancy.model.Invitation;
import com.grocery.business.tenancy.model.User;
import com.grocery.business.tenancy.repository.InvitationRepository;
import com.grocery.business.tenancy.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository; // Assuming you have a UserRepository for database operations

    @Autowired
    private InvitationRepository invitationRepository;

    public void addUser(User user) {
        userRepository.addUser(user);
    }

    public User getUserById(String userId) throws UserNotFoundException {
        return userRepository.findUserById(userId).orElseThrow(() -> { return new UserNotFoundException(); });
    }

    public boolean checkIfUserExists(String userId) {
        try {
            getUserById(userId);
            return true;
        } catch(UserNotFoundException e) {
            return false;
        }
    }

    public User getUserByEmail(String email) throws UserNotFoundException {
        return userRepository.findUserByEmail(email).orElseThrow(() -> { return new UserNotFoundException(); });
    }

    public List<Invitation> getAllInvitationsForUser(String userId) {
        return invitationRepository.getAllInvitationsForUser(userId);

    }

}
