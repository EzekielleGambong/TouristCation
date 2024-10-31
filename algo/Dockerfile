# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install LightFM
RUN pip install lightfm pymongo pandas scikit-learn flask --no-cache-dir

# Run app.py when the container launches
CMD ["python", "-u", "app.py"]