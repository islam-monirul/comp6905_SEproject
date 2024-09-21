import React from "react";
import Stack from "../Stack/Stack";
import Cover from "../Cover";
import Center from "../Center";
import Switcher from "../Switcher/Switcher";
import Reel from "../Reel";
import Box, { BorderBox } from "../Box/Box";
import Frame from "../Frame";
import Button from "../Button";
import Map from "../Map";
import FindPathForm from "../FindPathForm/FindPathForm";

function Home() {
  return (
    <>
      <Center>
        <Stack>
          <section>
            <Cover>
              <div className="stack-s">
                <h1 className="text-white">Explore the thrills of skiing</h1>
                <h2 className="text-white">Start your journey with us</h2>
                {/* <Button>Get Started</Button> */}
              </div>
            </Cover>
          </section>
          <section className="stack-s">
            <h2>Features</h2>

            <Switcher>
              <BorderBox>
                <Stack spacing={0.5}>
                  <i className="fas fa fa-road"></i>
                  <h3>Ski Map Trails</h3>
                  <p className="text-[#59544f]">
                    Explore detailed ski trail maps for your next adventure
                  </p>
                </Stack>
              </BorderBox>
              <BorderBox>
                <Stack spacing={0.5}>
                  <i className="fa fa-cutlery"></i>
                  <h3>Find a Restaurant</h3>
                  <p className="text-[#59544f]">
                    Explore detailed ski trail maps for your next adventure
                  </p>
                </Stack>
              </BorderBox>
              <BorderBox>
                <Stack spacing={0.5}>
                  <i className="fa fa-binoculars"></i>
                  <h3 className="">Equipment Rentals</h3>
                  <p className="text-[#59544f]">
                    Discover convenient equipment rentals for your trip
                  </p>
                </Stack>
              </BorderBox>
              <BorderBox>
                <Stack spacing={0.5}>
                  <i className="fa fa-cloud"></i>
                  <h3>Weather updates</h3>
                  <p className="text-[#59544f]">
                    Stay informend with realtime Weather updater to make your
                    trip convenient
                  </p>
                </Stack>
              </BorderBox>
            </Switcher>
          </section>
          <section className="stack-s">
            <h2>Explore</h2>
            <Reel>
              <Stack spacing={0.5}>
                <Frame>
                  <img
                    className="rounded-img"
                    src="https://images.pexels.com/photos/352093/pexels-photo-352093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  />
                </Frame>

                <p>Multiple Ski Trails</p>
              </Stack>

              <Stack spacing={0.5}>
                <Frame>
                  <img
                    className="rounded-img"
                    src="https://images.pexels.com/photos/352091/pexels-photo-352091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  />
                </Frame>

                <p>Gonodola Pass</p>
              </Stack>

              <Stack spacing={0.5}>
                <Frame>
                  <img
                    className="rounded-img"
                    src="https://images.pexels.com/photos/416805/pexels-photo-416805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  />
                </Frame>

                <p>Ski Competitions</p>
              </Stack>

              <Stack spacing={0.5}>
                <Frame>
                  <img
                    className="rounded-img"
                    src="https://images.pexels.com/photos/311066/pexels-photo-311066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  />
                </Frame>

                <p>Mountain Peak Resort</p>
              </Stack>
            </Reel>
          </section>
          <Map />
          <FindPathForm />
        </Stack>
      </Center>
    </>
  );
}

export default Home;
