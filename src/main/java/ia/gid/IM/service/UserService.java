package ia.gid.IM.service;

import ia.gid.IM.entity.Role;
import ia.gid.IM.entity.User;
import ia.gid.IM.repository.RoleRepository;
import ia.gid.IM.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role role = roleRepository.findByName("ROLE_USER")
                .orElseGet(()-> roleRepository.save(new Role(null, "ROLE_USER")));
        user.getRoles().add(role);
        return userRepository.save(user);
    }
}
