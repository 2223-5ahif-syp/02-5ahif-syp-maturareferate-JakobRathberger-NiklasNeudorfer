package at.htl;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;

@Entity
public class ExampleEntity extends PanacheEntity {
    public String name;
}
