package at.htl;

import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/example")
public class ExampleResource {

    @GET
    @Path("/hello")
    public String hello(){
        return "Hello World!";
    }

    @GET
    public List<ExampleEntity> getAll() {
        return ExampleEntity.listAll();
    }

    @POST
    @Transactional
    public void add(String name) {
        var e = new ExampleEntity();
        e.name = name;
        ExampleEntity.persist(e);
    }
}
