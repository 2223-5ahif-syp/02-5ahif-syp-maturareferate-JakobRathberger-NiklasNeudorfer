package at.htl;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class ExampleResourceTest {

    @Test
    public void testExampleEndpoint() {
        given().body("ExampleName")
                .when().post("/example")
                .then()
                .statusCode(204);

        given()
                .when().get("/example")
                .then()
                .statusCode(200)
                .body(is("[{\"id\":1,\"name\":\"ExampleName\"}]"));
    }

}
