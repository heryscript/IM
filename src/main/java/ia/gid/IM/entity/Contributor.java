package ia.gid.IM.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
public class Contributor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String function;
    private String organisation;
    private String githubUsername;

    @Enumerated(EnumType.STRING)
    private StatusContributor status;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToMany
    @JoinTable(
            name = "contributor_packages",
            joinColumns = @JoinColumn(name = "contributor_id"),
            inverseJoinColumns = @JoinColumn(name = "package_id")
    )
    private Set<PackageProvision> packages;
}
