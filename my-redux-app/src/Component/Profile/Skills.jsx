import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import LinearWithValueLabel from "../utils/LinearWithValueLabel";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSkillsByID } from "../../features/Profile/profileAPI";

function Skills() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.profile?.skills);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    getUserList();
  }, [dispatch]);

  const getUserList = () => {
    dispatch(getSkillsByID());
  };

  console.log(skills, "skills>>>>>>>>");
  return (
    <>
      <Container maxWidth="xl" sx={{ my: 5 }}>
        <Container container spacing={4}>
          <Grid item xs={12} spacing={2} container>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h3">Skills</Typography>
              </Box>

              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Button variant="outlined" startIcon={<PlaylistAddIcon />}>
                  Add new
                </Button>
              </Box>
            </Grid>

            {skills.map((skill) => {
              return (
                <>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={4} sx={{ py: 2 }}>
                      <Box display="flex" justifyContent="center">
                        <Typography variant="h5">
                          {skill.categoryName}
                        </Typography>
                      </Box>
                      {skill.list.map((item) => {
                        return (
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ m: 2 }}
                              display="flex"
                              alignItems="center"
                            >
                              {item.name}
                            </Typography>

                            <Typography
                              variant="body1"
                              sx={{ m: 2 }}
                              display="flex"
                              alignItems="center"
                            >
                              <LinearWithValueLabel
                                value={item.value}
                                show={true}
                              />
                            </Typography>
                          </Box>
                        );
                      })}
                    </Paper>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Skills;
