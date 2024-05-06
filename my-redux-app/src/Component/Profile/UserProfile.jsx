import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  ButtonBase,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Container, styled } from "@mui/system";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinearWithValueLabel from "../utils/LinearWithValueLabel";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../features/Profile/profileAPI";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile?.data);
  const status = useSelector((state) => state.user.status);

  console.log(profile, "profile>>>>");

  useEffect(() => {
    getUserList();
  }, [dispatch]);

  const getUserList = () => {
    dispatch(fetchProfile());
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ my: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper elevation={4}>
              <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item sm={12} md={4} lg={3}>
                  <Grid spacing={2} container>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={12}
                      sx={{ textAlign: "center" }}
                    >
                      <Paper sx={{ py: 1 }}>
                        <Box>
                          <ButtonBase sx={{ borderRadius: "20rem" }}>
                            <Paper
                              sx={{
                                borderRadius: "20rem",
                                padding: "0.1rem",
                                border: "1px solid #8080801c",
                              }}
                            >
                              <Avatar
                                sx={{ width: 150, height: 150 }}
                                alt="profile-img"
                                src={`${
                                  profile?.image.path
                                    ? profile?.image.path
                                    : "https://source.unsplash.com/featured/300x300/?developer"
                                }`}
                              />
                            </Paper>
                          </ButtonBase>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="h5" gutterBottom>
                            {`${profile?.firstName} ${profile?.lastName}`}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {profile?.designation}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={12}>
                      <Paper sx={{ p: 2 }}>
                        <Box>
                          <Typography
                            variant="body1"
                            display="flex"
                            alignItems="center"
                            sx={{ mx: 2 }}
                          >
                            <LanguageIcon />{" "}
                            <Link
                              href="https://www.sourcenettechnology.com/"
                              color="inherit"
                              underline="hover"
                              sx={{ mx: 2 }}
                            >
                              Sourcenet Technology
                            </Link>
                          </Typography>

                          <Divider variant="middle" sx={{ my: 2 }} flexItem />

                          <Typography
                            variant="body1"
                            display="flex"
                            alignItems="center"
                            sx={{ mx: 2 }}
                          >
                            <LinkedInIcon />{" "}
                            <Link
                              href="https://www.linkedin.com/in/parth-kathiriya-402958215/"
                              color="inherit"
                              underline="hover"
                              sx={{ mx: 2 }}
                            >
                              Parth Kathiriya
                            </Link>
                          </Typography>

                          <Divider variant="middle" sx={{ my: 2 }} flexItem />

                          <Typography
                            variant="body1"
                            display="flex"
                            alignItems="center"
                            sx={{ mx: 2 }}
                          >
                            <GitHubIcon />{" "}
                            <Link
                              href="https://github.com/parth-283"
                              color="inherit"
                              underline="hover"
                              sx={{ mx: 2 }}
                            >
                              Parth-283
                            </Link>
                          </Typography>

                          <Divider variant="middle" sx={{ my: 2 }} flexItem />

                          <Typography
                            variant="body1"
                            display="flex"
                            alignItems="center"
                            sx={{ mx: 2 }}
                          >
                            <InstagramIcon />{" "}
                            <Link
                              href="https://www.sourcenettechnology.com/"
                              color="inherit"
                              underline="hover"
                              sx={{ mx: 2 }}
                            >
                              Parth_kathiriya283
                            </Link>
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sm={12} md={8} lg={9} spacing={2} container>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <Box>
                        <Typography variant="h5">Personal Profile</Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="body1"
                          sx={{ mx: 2 }}
                          display="flex"
                          alignItems="center"
                        >
                          First Name: {profile?.firstName}
                        </Typography>

                        <Divider variant="middle" sx={{ my: 2 }} flexItem />

                        <Typography
                          variant="body1"
                          sx={{ mx: 2 }}
                          display="flex"
                          alignItems="center"
                        >
                          Last Name: {profile?.lastName}
                        </Typography>

                        <Divider variant="middle" sx={{ my: 2 }} flexItem />

                        <Typography
                          variant="body1"
                          sx={{ mx: 2 }}
                          display="flex"
                          alignItems="center"
                        >
                          Email: {profile?.email}
                        </Typography>

                        <Divider variant="middle" sx={{ my: 2 }} flexItem />

                        <Typography
                          variant="body1"
                          sx={{ mx: 2 }}
                          display="flex"
                          alignItems="center"
                        >
                          Mobile: {profile?.mobile}
                        </Typography>

                        <Divider variant="middle" sx={{ my: 2 }} flexItem />

                        <Typography
                          variant="body1"
                          sx={{ mx: 2 }}
                          display="flex"
                          alignItems="center"
                        >
                          Address:{" "}
                          {`${profile?.city}, ${profile?.state}, ${profile?.country}.`}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} spacing={2} container>
                    <Grid item xs={12} md={6} lg={4}>
                      <Paper sx={{ p: 2 }}>
                        <Box>
                          <Typography variant="h5">Skills</Typography>
                        </Box>

                        <Box>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ m: 2 }}
                              display="flex"
                              alignItems="center"
                            >
                              Javascript
                            </Typography>

                            <Typography
                              variant="body1"
                              sx={{ m: 2 }}
                              display="flex"
                              alignItems="center"
                            >
                              <LinearWithValueLabel value={85} show={false} />
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ m: 2 }}
                              display="flex"
                              alignItems="center"
                            >
                              React
                            </Typography>

                            <Typography
                              variant="body1"
                              sx={{ m: 2 }}
                              display="flex"
                              alignItems="center"
                            >
                              <LinearWithValueLabel value={78} show={false} />
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ m: 2 }}
                              display="flex"
                              alignItems="center"
                            >
                              MUI
                            </Typography>

                            <Typography
                              variant="body1"
                              sx={{ m: 2 }}
                              display="flex"
                              alignItems="center"
                            >
                              <LinearWithValueLabel value={70} show={false} />
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ m: 2 }}
                              display="flex"
                              alignItems="center"
                            >
                              Git
                            </Typography>

                            <Typography
                              variant="body1"
                              sx={{ m: 2 }}
                              display="flex"
                              alignItems="center"
                            >
                              <LinearWithValueLabel value={67} show={false} />
                            </Typography>
                          </Box>

                          <Box textAlign="end" sx={{ mt: 1 }}>
                            <Button
                              variant="text"
                              endIcon={<KeyboardArrowRightIcon />}
                              onClick={() => {
                                navigate("/skills");
                              }}
                            >
                              More{" "}
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={7}>
                      <Paper sx={{ p: 2 }}>
                        <Box>
                          <Typography variant="h5">Experience</Typography>
                        </Box>
                        <Box>
                          <Box
                            sx={{ m: 2 }}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item xs={12} container>
                              <Grid item xs={12} sm={6} md={12} lg={6}>
                                <Typography variant="subtitle1">
                                  <Link
                                    href="https://www.sourcenettechnology.com/"
                                    color="inherit"
                                    underline="hover"
                                  >
                                    Sourcenet Technology
                                  </Link>
                                </Typography>
                              </Grid>

                              <Grid item xs={12} sm={6} md={12} lg={6}>
                                <Typography variant="body2" sx={{ pl: 1 }}>
                                  {"March 2023 - Present"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>

                          <Box
                            sx={{ m: 2 }}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item xs={12} container>
                              <Grid item xs={12} sm={6} md={12} lg={6}>
                                <Typography variant="subtitle1">
                                  <Link
                                    href="https://www.bluesoft.live/"
                                    color="inherit"
                                    underline="hover"
                                  >
                                    Bluesoft Infotech
                                  </Link>
                                </Typography>
                              </Grid>

                              <Grid item xs={12} sm={6} md={12} lg={6}>
                                <Typography variant="body2" sx={{ pl: 1 }}>
                                  {"December 2021 - March 2023"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box textAlign="end" sx={{ mt: 1 }}>
                            <Button
                              variant="text"
                              endIcon={<KeyboardArrowRightIcon />}
                              onClick={() => {
                                navigate("/experience");
                              }}
                            >
                              More{" "}
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default UserProfile;
