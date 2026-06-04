package com.grocery.business.tenancy.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.transaction.annotation.Transactional;

import com.grocery.business.tenancy.model.UserProviderLink;
import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.business.tenancy.model.Invitation;
import com.grocery.business.tenancy.model.User;
import com.grocery.business.tenancy.repository.InvitationRepository;
import com.grocery.business.tenancy.repository.UserProviderRepository;
import com.grocery.business.tenancy.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository; 

    @Autowired
    private UserProviderRepository userProviderRepository;

    @Autowired
    private InvitationRepository invitationRepository;

    public void addUser(User user) {
        userRepository.save(user);
    }

    public User getUserById(String userId) throws UserNotFoundException {
        return userRepository.findById(userId).orElseThrow(() -> { return new UserNotFoundException(); });
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
        return userRepository.findByEmail(email).orElseThrow(() -> { return new UserNotFoundException(); });
    }

    @Transactional
    public User resolveOidcUser(String provider, OidcUser oidcUser) {
        
        // check if user is in the user_provider table, if so load him from the users table
        // create a AppUser instance
        
        // if not exist, check if email exists
            // if exists - link accounts (add to user_provider)
            // else - register user
        User appUser = userRepository.findByProviderAndSubject(provider, oidcUser.getSubject())
            .orElseGet(() -> {
                User ret = userRepository.findByEmail(oidcUser.getEmail()).orElseGet(() -> registerUser(oidcUser));
                userProviderRepository.save(new UserProviderLink(ret.getId(), provider, oidcUser.getSubject()));

                return ret;
            });
        
        return appUser;
    }

    
    private User registerUser(OidcUser oidcUser) {
        User appUser = new User(
            UUID.randomUUID().toString(),
            oidcUser.getEmail(),
            oidcUser.getGivenName(),
            oidcUser.getFamilyName(),
            oidcUser.getFullName(),
            oidcUser.getPicture()
        );

        userRepository.save(appUser);

        return appUser;
    }

}
