def has_no_decreasing(password) 
  valid = true

  password.each_with_index do |digit, i|
    if i != 0 && digit < password[i -1]
      valid = false
    end
  end

  valid 
end

def has_adjacent_equal_digits(password) 
  valid = false

  password.each_with_index do |digit, i|
    if 
      i != 0 &&
      digit == password[i - 1] &&
      digit != password[i - 2] &&
      digit != password[i + 1] 
      valid = true
    end
  end

  valid 
end

valid_passwords = []

(128392..643281).each do |password|
  password_array = password.to_s.split('') 
  if has_no_decreasing(password_array) && has_adjacent_equal_digits(password_array)
    valid_passwords.push(password)
  end
end

puts valid_passwords.length