function J = computeCost(X, y, theta)
%COMPUTECOST Compute cost for linear regression
%   J = COMPUTECOST(X, y, theta) computes the cost of using theta as the
%   parameter for linear regression to fit the data points in X and y

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly 
J = 0;

%For Reference, The Cost Function:
%   J(theta) = (1/2m){sum[i=1, m](hvtheta(x^i)-y^i)^2)} where,
%   hvtheta(x)=thetaTranspose*x=thetav0 + thetav1*xv1
%       Batch Gradient Descent:
%           thetavj := thetavj - alpha(1/m){sum[i=1, m](hvtheta(x^i)-y^i*xvj^i)}

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost of a particular choice of theta
%               You should set J to the cost.

h = X*theta;                        %Hypothesis
squaredErrors = (h - y) .^ 2;       %Squared Errors
J = (1/(2*m))*sum(squaredErrors);   %Cost Function

% =========================================================================

end
