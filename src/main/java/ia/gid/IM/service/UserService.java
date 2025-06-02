package ia.gid.IM.service;

import ia.gid.IM.entity.Role;
import ia.gid.IM.entity.User;
import ia.gid.IM.entity.VerificationToken;
import ia.gid.IM.repository.RoleRepository;
import ia.gid.IM.repository.TokenRepository;
import ia.gid.IM.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;

    public User registerUser(User user) {
//       DESACTIVER LE COMPTE USER
        user.setEnabled(false);

//        DEFINIR LE ROLE USER
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role role = roleRepository.findByName("ROLE_USER")
                .orElseGet(()-> roleRepository.save(new Role(null, "ROLE_USER")));
        user.getRoles().add(role);

        User savedUser = userRepository.save(user);

//        GENERATION DU TOKEN
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpiryDate(LocalDateTime.now().plusDays(1));
        tokenRepository.save(verificationToken);

//        String link = "http://localhost:8080/api/auth/verify?token=" + token;
        emailService.send(user.getEmail(), "Votre code de verification : " + token);

        return savedUser;
    }

    public String verifyEmail(String token) {
        Optional<VerificationToken> optionalToken = tokenRepository.findByToken(token);
        if (optionalToken.isEmpty()) {
            throw new IllegalArgumentException("Token invalide.");
        }

        VerificationToken verificationToken = optionalToken.get();
        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Token expiré.");
        }

        User user = verificationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        tokenRepository.delete(verificationToken); // Optionnel

        return "Compte activé !";
    }

}
